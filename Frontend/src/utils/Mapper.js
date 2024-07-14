/**
 * Gets the Coords for your box!
 
 */
export const getCoordinates = (row, subrow, level) => {

  const x = 2.5 * subrow -13.5;
  const y = (1.7 * level) ;
  const z = (15*row) - 30;
  return [ x, y, z ];
};
//takes in the row index,subrow index,and level: returns the corresponding x,y,z positions

