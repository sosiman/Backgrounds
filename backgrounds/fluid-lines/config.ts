import { BackgroundConfig } from '@/lib/types';
import { jsxCode, tsxCode, tsxCodeHTML, jsxCodeHTML, usageCodeHTML, usageCode } from './code'

export default {
  name: 'Fluid Lines',
  description: 'A captivating animated background of glowing hexagon patterns that leave trailing marks as they dynamically evolve.',
  author: 'NetMods',
  tags: ['animated', 'hexagons', 'glowing', 'patterns', 'trails', 'abstract', 'geometric'],
  defaultProps: {
    backgroundColor: '#000000',
    lineColor: '#FFFFFF',
    gap: 25,
    radius: 160,
    force: 6,
    gravity: 0.3,
    waveSpeed: 8000,
    mouseInteraction: 'smear',
    effects: "wind"
  },
  code: {
    usage: usageCodeHTML,
    rawUsage: usageCode,
    tsx: tsxCodeHTML,
    jsx: jsxCodeHTML,
    rawjsx: jsxCode,
    rawtsx: tsxCode
  },
  controls: [
    {
      key: 'backgroundColor',
      label: 'Background Color',
      type: 'color',
      defaultValue: '#000000',
      description: 'The overall background color',
    },
    {
      key: 'lineColor',
      label: 'Line Color',
      type: 'color',
      defaultValue: '#FFFFFF',
      description: 'The overall Color of Lines',
    },
    {
      key: 'gap',
      label: 'Line Gap',
      type: 'slider',
      min: 20,
      max: 200,
      step: 5,
      defaultValue: 25,
      description: 'The number of lines in the canvas'
    },
    {
      key: 'radius',
      label: 'Radius',
      type: 'slider',
      min: 50,
      max: 500,
      step: 10,
      defaultValue: 160,
      description: 'The number of lines in the canvas'
    },

    {
      key: 'force',
      label: 'Force',
      type: 'slider',
      min: 0,
      max: 20,
      step: 1,
      defaultValue: 6,
      description: 'The maximum number of lines active in the animation at any time.',
    },
    {
      key: 'gravity',
      label: 'Gravity',
      type: 'slider',
      min: 10,
      max: 100,
      step: 10,
      defaultValue: 10,
      description: 'The base timing factor influencing the speed of hexagon movements.',
    },
    {
      key: 'waveSpeed',
      label: 'Wave Speed',
      type: 'slider',
      min: 0,
      max: 10000,
      step: 100,
      defaultValue: 8000,
      description: 'Additional time variation applied to the animation cycles.',
    },
    {
      key: 'mouseInteraction',
      label: 'Mouse Effect',
      type: 'select',
      options: ['none', 'smear', 'converg', 'diverg'],
      defaultValue: 'smear',
      description: 'The overall color palette applied to the particles and lines in the noise animation.',
    },
    {
      key: 'effects',
      label: 'General Effect',
      type: 'select',
      options: ['none', 'wind', 'waves'],
      defaultValue: 'wind',
      description: 'The overall color palette applied to the particles and lines in the noise animation.',
    },
  ],
} as Omit<BackgroundConfig, 'id'>;
