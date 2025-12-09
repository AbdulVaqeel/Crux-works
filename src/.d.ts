// // src/types/react-word-cloud.d.ts
// declare module '@isoterik/react-word-cloud' {
//   import * as React from 'react';

//   export interface Word {
//     text: string;
//     value: number;
//     // allow other fields if present
//     [key: string]: any;
//   }

//   export interface WordCloudProps {
//     words: Word[];
//     width?: number;
//     height?: number;
//     font?: string;
//     fontWeight?: string | number;
//     fontSize?: (word: Word) => number | number;
//     colors?: string[] | ((word: Word) => string);
//     padding?: number;
//     rotationAngles?: number[];
//     spiral?: string;
//     onWordClick?: (word: Word) => void;
//     [key: string]: any; // allow extra props
//   }

//   export const WordCloud: React.FC<WordCloudProps>;
//   export default WordCloud;
// }


// src/types/react-word-cloud.d.ts
declare module '@isoterik/react-word-cloud' {
  import * as React from 'react';

  export interface Word {
    text: string;
    value: number;
    [key: string]: any;
  }

  export type GradientStop = {
    offset: string | number;
    color: string;
    opacity?: number;
  };

  export type Gradient = {
    id: string;
    type: 'linear' | 'radial';
    angle?: number;
    stops: GradientStop[];
  };

  export interface WordCloudProps {
    words: Word[];
    width?: number;
    height?: number;
    font?: string;
    fontWeight?: string | number;
    /**
     * fontSize: either a number or a function (word) => number
     */
    fontSize?: number | ((word: Word) => number);
    /**
     * fill: function to return color string (or gradient url) for a word
     */
    fill?: (word: Word, index: number) => string;
    /**
     * rotate: function returning angle (degrees) per word
     */
    rotate?: (word: Word, index: number) => number;
    /**
     * rotationAngle: shorthand single rotation angle (number)
     */
    rotationAngle?: number;
    padding?: number;
    spiral?: 'archimedean' | 'rectangular' | string;
    gradients?: Gradient[];
    onWordClick?: (word: Word) => void;
    // allow other props without TS errors
    [key: string]: any;
  }

  export const WordCloud: React.FC<WordCloudProps>;
  export default WordCloud;
}
