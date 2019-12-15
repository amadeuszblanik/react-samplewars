const forEachObject = (objects: {}, action: (key: any, value: any) => void) => {
  for (const [key, value] of Object.entries(objects)) {
    action(key, value);
  }
};

export default forEachObject;
