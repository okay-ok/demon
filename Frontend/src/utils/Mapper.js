//takes in the row index,subrow index,and level: returns the corresponding x,y,z positions
export const getCoordinates = (row, subrow, level) => {
  const x = 2.5 * subrow -13.5;
  const y = 1.3 * level;
  const z = 2* row;
  return [ x, y, z ];
};
//takes in the row index,subrow index,and level: returns the corresponding x,y,z positions