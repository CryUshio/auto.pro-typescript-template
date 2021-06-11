interface FloatyWindow {
  setAdjustEnabled(enabled: boolean): void;
  setPosition(x: number, y: number): void;
  getX(): number;
  getY(): number;
  setSize(width: number, height: number): void;
  getWidth(): number;
  getHeight(): number;
  close(): void;
  exitOnClose(): void;
}
interface FloatyRawWindow extends Omit<FloatyWindow, 'setAdjustEnabled'> {
  setTouchable(toucable: boolean);
}
declare const floaty: {
  checkPermission(): boolean;
  requestPermission(): boolean;
  window(layout: any): FloatyWindow & { [key: string]: any };
  rawWindow(layout: any): FloatyRawWindow & { [key: string]: any };
};
