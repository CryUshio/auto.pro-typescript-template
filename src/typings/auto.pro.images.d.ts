interface Point {
  x: number;
  y: number;
}

interface Match {
  point: Point;
  similarity: number;
}

interface MatchingResult {
  matches: Match[];
  points: Point[];
  first(): Match | null;
  last(): Match | null;
  leftmost(): Match | null;
  rightmost(): Match | null;
  bottommost(): Match | null;
  best(): Match | null;
  worst(): Match | null;
  sortBy(cmp: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): MatchingResult;
}

/* OpenCV 的 Mat 对象 */
interface Mat {
  [key: string]: any;
}

type ImageType = 'jpg' | 'jpeg' | 'png' | 'webp';

interface Image {
  width: number;
  height: number;
  getWidth(): number;
  getHeight(): number;
  saveTo(path): void;
  pixel(x: number, y: number): number;
  recycle(): void;
  isRecycled(): boolean;
  mat: Mat;
  getBitmap(): any;
}

declare const images: {
  read(path: string): Image;

  load(url: string): void;

  copy(image: Image): Image;

  save(image: Image, path: string, format?: ImageType, quality?: number): void;

  fromBase64(base64: string): Image;

  toBase64(image: Image, format?: ImageType, quality?: number): string;

  clip(image: Image, x: number, y: number, width: number, height: number): Image;

  resize(image: Image, size?: [number, number], interpolation?: Interpolation): Image;

  scale(image: Image, scaleX, scaleY, interpolation?: Interpolation): Image;

  rotate(image: Image, degress: number, x?: number, y?: number): Image;

  concat(image: Image, resource: Image, direction?: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'): Image;

  grayscale(image: Image): Image;

  threshold(image: Image, threshold: number, maxVal: number, thresholdType?: ThresholdType): Image;

  adaptiveThreshold(
    image: Image,
    maxValue: number,
    adaptiveMethod: 'MEAN_C' | 'GAUSSIAN_C',
    thresholdType: 'BINARY' | 'BINARY_INV',
    blockSize: number,
    C: number,
  ): Image;

  cvtColor(image: Image, code: 'BGR2GRAY' | 'BGR2HSV' | string, dstCn?: number): Image;

  inRange(image: Image, lowBound: Color, upperBound: Color): Image;

  interval(image: Image, color: Color, interval: number): Image;

  blue(image: Image, size: [number, number], anchor?: Array<any>, type?: BlurType): Image;

  medianBlur(image: Image, size: [number, number]): Image;

  gaussianBlur(
    image: Image,
    size: [number, number],
    sigmaX?: number,
    sigmaY?: number,
    type?: BlurType,
  ): Image;

  matToImage(mat: Mat): Image;

  requestScreenCapture(landscape?: boolean): boolean;
  requestScreenCapture(width: number, height: number): boolean;
  requestScreenCapture(option: {
    async?: boolean;
    orientation?: number;
    width?: number;
    height?: number;
  }): boolean;

  captureScreen(): Image;
  captureScreen(path: string): void;

  pixel(image: Image, x: number, y: number): number;

  findColor(
    image: Image,
    color: Color,
    options: {
      region?: RegionType;
      threshold?: number;
    },
  ): Point | null;
  findColorInRegion(
    image: Image,
    color: Color,
    x: number,
    y: number,
    width?: number,
    height?: number,
    threshold?: number,
  ): Point | null;
  findColorEquals(image: Image, color: Color, ...region: RegionType): Point | null;
  findMultiColors(
    image: Image,
    firstColor: Color,
    colorList: [number, number, Color][],
    options?: { region?: RegionType; threshold: number },
  ): Point | null;
  detectsColor(
    image: Image,
    color: Color,
    x: number,
    y: number,
    threshold?: number,
    algorithm?: 'diff' | 'equal' | 'rgb' | 'rgb+' | 'hs',
  ): boolean;

  findImage(
    image: Image,
    template: Image,
    options?: {
      region?: RegionType;
      threshold?: number;
      level?: number;
    },
  ): Point | null;
  findImageInRegion(image: Image, template: Image, ...region: RegionType): Point | null;
  matchTemplate(
    image,
    template,
    options?: {
      region?: RegionType;
      threshold?: number;
      max?: number;
      level?: number;
    },
  ): MatchingResult;
};

declare function captureScreen(path?: string): Image;

type Color = string | number;

declare const colors: {
  /**
   * 返回颜色值的字符串，格式为 "#AARRGGBB"
   * @param {Color} color 颜色值
   */
  toString(color: Color): string;

  /**
   * 返回颜色color的R通道的值，范围0~255
   * @param {Color} color 颜色值
   */
  red(color: Color): number;

  /**
   * 返回颜色color的G通道的值，范围0~255
   * @param {Color} color 颜色值
   */
  green(color: Color): number;

  /**
   * 返回颜色color的B通道的值，范围0~255
   * @param {Color} color 颜色值
   */
  blue(color: Color): number;

  /**
   * 返回颜色color的Alpha通道的值，范围0~255
   * @param {Color} color 颜色值
   */
  alpha(color: Color): number;

  /**
   * 将rgb三通道的值组合成整数颜色值
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   */
  rgb(red: number, green: number, blue: number): number;

  /**
   * 将string颜色转换成number颜色
   * @param {string} color
   */
  parseColor(color: string): number;

  /**
   * 判断两个颜色是否相似
   * @param {Color} color1
   * @param {Color} color2
   * @param {number} threshold 默认为4，取值为0~255，值越大则判定越宽泛，值为0是要求完全相等才为true
   * @param {'diff'|'rga'|'rbg+'|'hs'} algorithm 颜色匹配算法，默认为'diff'
   */
  isSimilar(color1: Color, color2: Color, threshold?: number, algorithm?: string): boolean;

  /**
   * 判断两个颜色是否相等，忽略Alpha通道
   * @param color1
   * @param color2
   */
  equals(color1: Color, color2: Color): boolean;
};
