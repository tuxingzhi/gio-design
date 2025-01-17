import { placements } from 'rc-tooltip/lib/placements';
import { BuildInPlacements } from 'rc-trigger';

const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1,
};

const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0,
};

const targetOffset = [0, 0];

export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}

export interface PlacementsConfig {
  arrowWidth?: number;
  horizontalArrowShift?: number;
  verticalArrowShift?: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
}

export function getOverflowOptions(autoAdjustOverflow?: boolean | AdjustOverflow) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow,
  };
}

export default function getPlacements(config: PlacementsConfig) {
  const {
    arrowWidth = 6,
    horizontalArrowShift = 20,
    verticalArrowShift = 20,
    autoAdjustOverflow = true,
    arrowPointAtCenter = false,
  } = config;
  const placementMap: BuildInPlacements = {
    left: {
      points: ['cr', 'cl'],
      offset: [-4, 0],
    },
    right: {
      points: ['cl', 'cr'],
      offset: [4, 0],
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4],
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4],
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth - 6), -4],
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth - 6)],
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth - 6, -4],
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth - 6)],
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth - 6, 4],
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth - 6],
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth - 6), 4],
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth - 6],
    },
  };
  Object.keys(placementMap).forEach((key) => {
    const common = {
      overflow: getOverflowOptions(autoAdjustOverflow),
      ignoreShake: true,
    };
    placementMap[key] = arrowPointAtCenter
      ? { ...placementMap[key], ...common, targetOffset }
      : { ...placements[key], ...common };
  });
  return placementMap;
}
