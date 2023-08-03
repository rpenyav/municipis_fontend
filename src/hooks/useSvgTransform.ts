import { useEffect, useState, RefObject } from "react";

type Transform = { x: number; y: number; scale: number };

const useSvgTransform = (
  ref: RefObject<SVGSVGElement>,
  municipios: any,
  initialScale: number = 10
): Transform => {
  const [transform, setTransform] = useState<Transform>({
    x: 0,
    y: 0,
    scale: initialScale,
  });

  useEffect(() => {
    if (ref.current) {
      const bbox = ref.current.getBBox();
      const scale = initialScale;
      const newTransform = {
        x: 350 - (bbox.width * scale) / 2 - bbox.x * scale,
        y: 350 - (bbox.height * scale) / 2 - bbox.y * scale,
        scale: scale,
      };

      if (
        newTransform.x !== transform.x ||
        newTransform.y !== transform.y ||
        newTransform.scale !== transform.scale
      ) {
        setTransform(newTransform);
      }
    }
  }, [municipios, transform]);

  return transform;
};

export default useSvgTransform;
