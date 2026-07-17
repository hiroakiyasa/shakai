#!/usr/bin/env python3
import argparse
import json
import re
import struct
import sys
from pathlib import Path


def png_size(path: Path):
    with path.open("rb") as stream:
        signature = stream.read(8)
        if signature != b"\x89PNG\r\n\x1a\n":
            raise ValueError("not a PNG signature")
        length = struct.unpack(">I", stream.read(4))[0]
        chunk = stream.read(4)
        if chunk != b"IHDR" or length < 8:
            raise ValueError("missing IHDR")
        width, height = struct.unpack(">II", stream.read(8))
        return width, height


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("project_root", nargs="?", default=".")
    parser.add_argument("--require-complete", action="store_true")
    args = parser.parse_args()

    root = Path(args.project_root).resolve()
    plan = json.loads((root / "image_generation/LOCKED_PAGE_SEQUENCE.json").read_text())
    state = json.loads((root / "image_generation/state.json").read_text())
    generated = root / "image_generation/generated"
    pattern = re.compile(r"^IMG_(\d{4})\.png$")

    files = {}
    unregistered_names = []
    for path in sorted(generated.glob("*.png")):
        match = pattern.match(path.name)
        if not match:
            unregistered_names.append(path.name)
            continue
        number = int(match.group(1))
        files[number] = path

    total = plan["total_images"]
    expected = set(range(1, total + 1))
    present = set(files)
    missing = sorted(expected - present)
    outside = sorted(present - expected)
    errors = []
    dimensions = {}
    for number, path in files.items():
        try:
            width, height = png_size(path)
            dimensions[f"{width}x{height}"] = dimensions.get(f"{width}x{height}", 0) + 1
            if abs((width / height) - (9 / 16)) > 0.005:
                errors.append(f"IMG_{number:04d}: aspect {width}x{height} is not 9:16")
        except Exception as exc:
            errors.append(f"IMG_{number:04d}: {exc}")

    completed = set(state.get("completed_images", []))
    if completed != present:
        errors.append(f"state completed_images differs from generated files: state={len(completed)}, files={len(present)}")
    if state.get("target_images") != total:
        errors.append("state target_images differs from locked plan")
    if outside:
        errors.append(f"outside-plan images: {outside}")
    if unregistered_names:
        errors.append(f"unregistered PNG names: {unregistered_names}")
    if args.require_complete and missing:
        errors.append(f"required images missing: {len(missing)}")

    result = {
        "subject": state.get("subject"),
        "plan_version": state.get("plan_version"),
        "planned": total,
        "generated_validated": len(present),
        "contiguous_through": next((n - 1 for n in range(1, total + 1) if n not in present), total),
        "next_image": missing[0] if missing else None,
        "missing_count": len(missing),
        "dimensions": dimensions,
        "complete": not missing and not errors,
        "errors": errors,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if errors:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
