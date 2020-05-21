// import { OnSelectedType } from 'Components/SortByTools';

// const sorter = (type: OnSelectedType): ((a: any, b: any) => number) => {
//   if (!type) return (a, b) => a._id.localeCompare(b._id);
//   console.log('select ', type);
//   const dataSelect = type;
//   switch (type) {
//     case 'requestor':
//       return (a, b) => {
//         const aVal = a[dataSelect].slice(-1)[0].username;
//         const bVal = b[dataSelect].slice(-1)[0].username;
//         return aVal.localeCompare(bVal);
//       };
//     case 'createAt':
//       return (a: any, b: any) => {
//         console.log(a['createAt']);
//         return -(a[dataSelect].valueOf() - b[dataSelect].valueOf());
//       };
//     case 'state':
//       const varState = ['accept', 'wait', 'requested', 'reject', 'drop'];
//       return (a: string[], b: string[]) => {
//         const aVal = a[dataSelect].slice(-1)[0];
//         const bVal = b[dataSelect].slice(-1)[0];
//         if (a === b) return 0;
//         const aIndex = varState.findIndex(s => s === aVal);
//         const bIndex = varState.findIndex(s => s === bVal);
//         // const result = norm(aIndex - bIndex, -1, 1);
//         const result = aIndex - bIndex;
//         return result;
//       };
//     case 'area':
//       return (a, b) => a.area.name.localeCompare(b.area.name);
//     default:
//       return (a: string, b: string) =>
//         a[dataSelect].localeCompare(b[dataSelect]);
//   }
// };

// export default sorter;
