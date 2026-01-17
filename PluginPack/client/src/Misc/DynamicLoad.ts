const loaded: string[] = [];

export async function dynamicLoad(scripts: string[]) {
  const promises = scripts
    .filter(li => !loaded.includes(li))
    .map(path => {
      loaded.push(path);
      if (path.endsWith('.css')) {
        const link = document.createElement("link");
        link.href = 'http://assets.example/' + path;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return Promise.resolve();
      }
      else if (path.endsWith('.js')) {
        const script = document.createElement("script");
        script.src = 'http://assets.example/' + path;
        script.defer = true;
        return new Promise<void>((resolve) => {
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }
      else {
        return Promise.resolve();
      }
    });

  await Promise.all(promises);
}