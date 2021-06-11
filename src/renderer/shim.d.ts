interface NodeModule {
  hot?: {
    accept: (module: string, callback: () => void) => void;
  }
}
