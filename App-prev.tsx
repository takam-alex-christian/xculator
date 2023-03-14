// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import './App.css'

// import React, { useState, useEffect } from 'react'

// import Xbuttons from '../components/xbuttons'

// import { Box, Stack, Paper, Typography } from '@mui/material'

// function App() {

//   const [xData, setXData] = useState<{
//     screen: string,
//     operations: Array<string>,
//     operands: Array<string>,
//     ans: string,
//     hTxn: Array<String>
//   }>({
//     screen: "0",
//     operations: [],
//     operands: [],
//     ans: "0",
//     hTxn: []
//   })

//   const [ButtonValues, setButtonValues] = useState({
//     clear: "C",
//     delelete: "Del",
//     percentage: "%"
//   })

//   const [displayFocus, setDisplayFocus] = useState({
//     screen: true,
//     ans: false
//   })

//   const buttonGap = 2

//   const calButtonValues = "789456123"
//   const calOperations = "/*-+"
//   const calLastRow = "M0.="


//   function registerOperandsAndOperations(value) {
//     setXData((prev) => {
//       if (displayFocus.screen == false) changeDisplayFocus()

//       // console.log(e.currentTarget.value)

//       // copy screen, operands and operations
//       var tmpScreen = ""
//       const tmpOperands = [...prev.operands]
//       const tmpOperations = [...prev.operations]


//       // update screen, operands and operations

//       //#
//       if (parseInt(value) >= 0 && parseInt(value) <= 9) {
//         // if button pressed is a number
//         if (tmpOperands.length === tmpOperations.length) {
//           tmpOperands.push(value)
//         } else if (tmpOperands.length - 1 === tmpOperations.length) {
//           if (tmpOperands.length >= 1) tmpOperands[tmpOperands.length - 1] += value
//           else {
//             console.log("some operands error")
//           }
//         }

//       } else if (value == ".") {
//         if (tmpOperands.length >= 1 && tmpOperands[tmpOperands.length - 1].indexOf(".") === -1) {
//           tmpOperands[tmpOperands.length - 1] = tmpOperands[tmpOperands.length - 1].concat(value)
//         }
//       } else if (calOperations.split('').indexOf(value) !== -1) {
//         // if button pressed is an operation
//         // alert("operation pressed")
//         if (prev.operands.length > prev.operations.length) {
//           tmpOperations.push(value)
//         }
//       }

//   //     //#

//   //     // update tmpScreen
//   //     renderXcal()
//   //     // if (tmpOperands.length > 1) {
//   //     //   for (let i = 0; i <= tmpOperands.length - 1; i++) {
//   //     //     tmpScreen = tmpScreen.concat(tmpOperands[i])

//   //     //     if (i - 1 < tmpOperations.length - 1) {
//   //     //       tmpScreen = tmpScreen.concat(tmpOperations[i])
//   //     //     }
//   //     //   }
//   //     // } else if (tmpOperands.length === 1) {
//   //     //   // console.log(tmpScreen.concat(tmpOperands[0]))
//   //     //   tmpScreen = tmpScreen.concat(tmpOperands[0])

//   //     //   if (tmpOperations.length == 1) {
//   //     //     tmpScreen = tmpScreen.concat(tmpOperations[0])
//   //     //   }
//   //     // }

      
//       return { ...prev, screen: tmpScreen, operands: tmpOperands, operations: tmpOperations }
//     })
    
//   }

//   // function equalPressHandler() {
//   //   if (displayFocus.ans == false) changeDisplayFocus()
//   // }

//   // // undergoing testing now
//   // function renderXcal() {
    

//   //   setXData((prev) => {
//   //     let tmpScreen = prev.screen.substring(0); //
//   //     console.log("tmpscreen in the new renderXcal" + tmpScreen);

//   //     if (prev.operands.length > 1) {
//   //       for (let i = 0; i <= prev.operands.length - 1; i++) {
//   //         tmpScreen = tmpScreen.concat(prev.operands[i])

//   //         if (i - 1 < prev.operations.length - 1) {
//   //           tmpScreen = tmpScreen.concat(prev.operations[i])
//   //         }
//   //       }
//   //     } else if (prev.operands.length === 1) {
//   //       // console.log(tmpScreen.concat(tmpOperands[0]))
//   //       tmpScreen = tmpScreen.concat(prev.operands[0])

//   //       if (prev.operations.length == 1) {
//   //         tmpScreen = tmpScreen.concat(prev.operations[0])
//   //       }
//   //     } else {
//   //       tmpScreen = "screen is just a mistery at this point"
//   //     }

//   //     return { ...prev, screen: tmpScreen }
//   //   })

//   // }


//   // // not yet functional
//   // function backspacePressHandler() {
//   //   setXData((prev) => {
//   //     let tmpOperands = [...prev.operands]
//   //     let tmpOperations = [...prev.operations]

      

//   //     return { ...prev, operands: [], operations: [] }
//   //   })
//   // }


//   function onClick(e) {



//     if (e.currentTarget.value == "=") {

//       // equalPressHandler()

//     } else if (e.currentTarget.value.toLocaleLowerCase() == "m") {

//     } else {
//       registerOperandsAndOperations(e.currentTarget.value)

//       // console.log(xData)
//     }

//   }


//   function changeDisplayFocus() {
//     setDisplayFocus((prev) => {
//       return { screen: !prev.screen, ans: !prev.ans }
//     })
//   }



//   // // we wait till the windows is fully loaded
//   // // window.onload = (e) => {
//   // //   //then we start listening to keypresses
//   // //   window.addEventListener("keypress", (keyPressEvent) => {
//   // //     if (keyPressEvent.key == "=") equalPressHandler()
//   // //     else registerOperandsAndOperations(keyPressEvent.key);

//   // //   })

//   // //   window.addEventListener("keydown", (e) => {
//   // //     if (e.key.toLocaleLowerCase() == "backspace") {
//   // //       console.log("backspace pressed")
//   // //     }
//   // //   })
//   // // }

  
//   return (
//     <div className="App">

//       <Stack gap={2} sx={{ width: "min-content" }}>
//         {/* xcalcultor display area */}
//         <Paper sx={{ borderRadius: "1rem", overflow: "hidden" }} elevation={0}>
//           <Stack flexDirection={"column-reverse"} justifyContent={'end'} alignItems={"flex-end"} paddingX={"0.5rem"} paddingY={"0.5rem"} sx={{ height: "8rem", backgroundColor: "rgba(0,0,0,0.01)" }}>

//             <Box minHeight={"1rem"} >
//               <Typography variant={displayFocus.ans == true ? 'h3' : 'h6'} component={'div'}>{xData.ans}</Typography>
//             </Box>

//             <Box minHeight={"1rem"}>
//               <Typography variant={displayFocus.screen == true ? 'h3' : 'h6'} component={'div'}>{xData.screen}</Typography>
//             </Box>

//             {xData.hTxn.map((txn) => {
//               return (<Box minHeight={"0.5rem"} >{txn}</Box>)
//             })}


//           </Stack>
//         </Paper>

//         <Stack flexDirection={"row"} gap={buttonGap}>
//           {/* xcalculator buttons */}
//           <Stack flexDirection={"column"} gap={buttonGap}>
//             {/* buttons c, del, % */}
//             <Stack flexDirection={"row"} gap={buttonGap}>
//               {/* clear button */}
//               <Xbuttons.SquareButton value={ButtonValues.clear} onClick={() => { }} />
//               {/* del button */}
//               <Xbuttons.SquareButton value={ButtonValues.delelete} onClick={() => { }} />
//               {/* percentage button */}
//               <Xbuttons.SquareButton value={ButtonValues.percentage} onClick={() => { }} />
//             </Stack>
//             {/* buttons 7-9 */}
//             <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
//               {
//                 calButtonValues.substring(0, 3).split('').map((buttonValue, index) => {
//                   return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={onClick} />)
//                 })
//               }
//             </Stack>

//             {/* button 4-6 */}
//             <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
//               {
//                 calButtonValues.substring(3, 6).split('').map((buttonValue, index) => {
//                   return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={onClick} />)
//                 })
//               }
//             </Stack>

//             {/* buttons 1-3 */}
//             <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
//               {
//                 calButtonValues.substring(6, 9).split('').map((buttonValue, index) => {
//                   return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={onClick} />)
//                 })
//               }
//             </Stack>

//           </Stack>

//           {/* operations buttons /* /*-+ */}
//           <Stack flexDirection={"column"} gap={buttonGap}>
//             {
//               calOperations.split('').map((calOperation, index) => {
//                 return (<Xbuttons.SquareButton key={index} value={calOperation} onClick={onClick} />)
//               })
//             }
//           </Stack>

//         </Stack>

//         <Stack flexDirection={"row"} gap={buttonGap}>
//           {calLastRow.split('').map((lastRowValue, index) => {
//             return (<Xbuttons.SquareButton key={index} value={lastRowValue} onClick={onClick} />)
//           })}
//         </Stack>

//       </Stack>



//     </div>
//   )
// }

// export default App
