import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/public-sans';

import './App.css'
import Xbuttons from '../components/xbuttons'


import React, { useState, useEffect, useRef } from 'react'

import { Box, Stack, Paper, Typography, } from '@mui/material'

import { Sheet } from '@mui/joy'

// types and interfaces
interface XDataType {
  screen: string
  ans: number,
  hTxn: Array<string>,
  clearScreen: Boolean
}


function App() {

  const appRef = useRef(null);

  const [xData, setXData] = useState<XDataType>({
    screen: "",
    ans: 0,
    hTxn: [],
    clearScreen: false
  })

  const [displayFocus, setDisplayFocus] = useState({
    screen: true,
    ans: false
  })

  // const [clearScreen, setClearScreen] = useState(false);

  const ButtonValues = {
    clear: "C",
    delete: "Del",
    percentage: "%",
    answer: 'ans'
  }

  const buttonGap = 1

  const calButtonValues = "789456123"
  const calOperations = "/*-+"
  const calLastRow = "0.="


  // screen validation
  function isInputValid(inputKey: string): boolean {
    // inputKey is a string of length >= 1
    let isValid = false

    let operands = xData.screen.split(new RegExp('[\\/|*|\\-|+]'));

    let err = ""

    // // clear the screen if the input is valid and the screen = 0
    // if(xData.screen.length == 1 && xData.screen == '0') setXData((prev)=>{return {...prev, screen: ''}})

    //valid if there are enought characters to delete
    if (inputKey.toLowerCase() == "backspace" && xData.screen.length > 0) { isValid = true; err = "backspace verified" }

    //valid all the time especially if the last char of string is not a sign
    else if (inputKey.toLowerCase() == "enter") { isValid = true; err = "enter verified" }

    // valid if equal button is pressed as well
    else if (inputKey.toLowerCase() == '=') isValid = true

    //valid if equal button is pressed
    // else if (inputKey.toLowerCase() == 'ans') isValid = true

    // digit validation
    else if (parseInt(inputKey) >= 0 && parseInt(inputKey) <= 9) {
      isValid = true;
      err = "digit verified";
    }

    // test if inputkey is an operation and asserts that the last screen character is not a sign 
    else if (calOperations.indexOf(inputKey) !== -1 && calOperations.indexOf(xData.screen.slice(-1)) === -1) {
      isValid = true;
      err = "absent operation verified"

    }
    //test for the presence of a decimal point

    else if (inputKey == '.' && operands[operands.length - 1].indexOf('.') === -1) { isValid = true; err = "decimal point verified" } //causing the bug


    //we can add more if else statements to test for other special function buttons such C Del M %


    // if the user presses a button that is different from the equal sign, we switch the focus to the screen
    if (inputKey !== '=' && displayFocus.screen == false) switchDisplayFocus()


    // console.log((calOperations.indexOf(xData.screen.slice(-1)) !== -1) + "is last screen character")
    // calOperations.indexOf(xData.screen.slice(-1)) === -1
    return isValid
  }

  // inputKey Registeration
  function registerInputKey(inputKey: string) {

    // special key registeration for backspace 
    if (inputKey.toLowerCase() == 'backspace') setXData((prev) => { return { ...prev, screen: prev.screen.slice(0, -1) } })

    // if ans doesn't have the focus and the user presses the equal button
    else if (inputKey.toLowerCase() == '=') {

      // if (calOperations.indexOf(xData.screen.slice(-1)) === -1) {
      setXData((prev) => {
        return { ...prev, ans: calOperations.indexOf(xData.screen.slice(-1)) === -1 ? eval(prev.screen) : eval(prev.screen.substring(0, -1)), clearScreen: true }
      })



      // } else {
      //   console.log(xData.screen.substring(0, -1))
      //   setXData((prev) => {
      //     return { ...prev, ans: eval(prev.screen.substring(0, -1)) }
      //   })
      // }
      // eval

      // we can now register the previous operations to historical transactions

      if (displayFocus.ans == false) switchDisplayFocus()
      console.log(xData)


    }

    // register non special keys such as digits
    else {

      setXData((prev) => {
        // if(prev.ans.length > 0) console.log("test correct")
        // console.log(xData)
        return { ...prev, screen: prev.clearScreen ? inputKey : prev.screen.concat(inputKey), clearScreen: false }
      })

      // if (xData.clearScreen) setXData(false); // is true as soon as ans is pressed

    }
  }

  // change screen focus
  function switchDisplayFocus() {
    setDisplayFocus((prev) => {
      return { ...prev, screen: !prev.screen, ans: !prev.ans }
    })
  }

  // event handlers
  // screen button press handler
  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    // console.log(e.currentTarget.value);

    if (isInputValid(e.currentTarget.value)) registerInputKey(e.currentTarget.value)
    else if ("c/del/m".toLowerCase().split(new RegExp('[/]')).indexOf(e.currentTarget.value.toLowerCase()) !== -1) {

      if (e.currentTarget.value.toLowerCase() == 'del') {

        setXData((prev) => {

          // we create a temporary array out of the prev screen
          let tmpScreenArray = prev.screen.substring(0).split('');

          // then we delete the last item
          tmpScreenArray.pop();


          return { ...prev, screen: [...tmpScreenArray].join('') }  //now we turn tmpScreenArray into a string and pass it as the new value of screen
        })
      } else if (e.currentTarget.value.toLowerCase() == 'c') {

        setXData((prev) => {
          return { ...prev, screen: "" }
        })

      } else if (e.currentTarget.value.toLowerCase() == 'ans') {

        // we just add ans to the screen as input for further calculations
        setXData((prev) => {
          return { ...prev, screen: prev.screen.concat(prev.ans.toString()) }
        })

      }


    }

    // console.log("c/del/m".toLowerCase().split(new RegExp('[/]')))

  }


  // keyboard button press handler
  function keyDownHandler(e: React.KeyboardEvent) { //feature paused
    // console.log("the last character :" + xData.screen)

    if (isInputValid(e.key)) registerInputKey(e.key)

  }




  return (
    <div className="App">
      {/* <input type="text" onKeyDown={keyDownHandler}  /> */}
      <Stack gap={2} sx={{ width: "min-content" }}>
        {/* xcalcultor display area */}
        <Paper sx={{ borderRadius: "1rem", overflow: "hidden" }} elevation={0}>
          <Sheet variant='soft' color='neutral'>
            <Stack flexDirection={"column-reverse"} justifyContent={'end'} alignItems={"flex-end"} paddingX={"0.5rem"} paddingY={"0.5rem"} sx={{ height: "8rem", backgroundColor: "rgba(0,0,0,0.01)" }}>

              <Box minHeight={"1rem"} >
                <Typography variant={displayFocus.ans == true ? 'h3' : 'h6'} component={'div'}>{xData.ans}</Typography>
              </Box>

              <Box minHeight={"1rem"}>

                {/* <InputUnstyled className={"screenInput"} defaultValue={"0"}/> */}

                {/* prints zero when the screen is empty */}
                <Typography variant={displayFocus.screen == true ? 'h3' : 'h6'} component={'div'}>{xData.screen.length == 0 ? '0' : xData.screen}</Typography>
              </Box>

              {xData.hTxn.map((txn) => {
                return (<Box minHeight={"0.5rem"} >{txn}</Box>)
              })}

            </Stack>
          </Sheet>
        </Paper>

        <Stack flexDirection={"row"} gap={buttonGap}>
          {/* xcalculator buttons */}
          <Stack flexDirection={"column"} gap={buttonGap}>
            {/* buttons c, del, % */}
            <Stack flexDirection={"row"} gap={buttonGap}>
              {/* clear button */}
              <Xbuttons.SquareButton value={ButtonValues.clear} onClick={clickHandler} />
              {/* del button */}
              <Xbuttons.SquareButton value={ButtonValues.delete} onClick={clickHandler} />
              {/* percentage button */}
              <Xbuttons.SquareButton value={ButtonValues.percentage} onClick={clickHandler} />
            </Stack>
            {/* buttons 7-9 */}
            <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
              {
                calButtonValues.substring(0, 3).split('').map((buttonValue, index) => {
                  return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={clickHandler} />)
                })
              }
            </Stack>

            {/* button 4-6 */}
            <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
              {
                calButtonValues.substring(3, 6).split('').map((buttonValue, index) => {
                  return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={clickHandler} />)
                })
              }
            </Stack>

            {/* buttons 1-3 */}
            <Stack flexDirection={"row"} gap={buttonGap} sx={{}}>
              {
                calButtonValues.substring(6, 9).split('').map((buttonValue, index) => {
                  return (<Xbuttons.SquareButton key={index} value={buttonValue} onClick={clickHandler} />)
                })
              }
            </Stack>

          </Stack>

          {/* operations buttons /* /*-+ */}
          <Stack flexDirection={"column"} gap={buttonGap}>
            {
              calOperations.split('').map((calOperation, index) => {
                return (<Xbuttons.SquareButton key={index} value={calOperation} onClick={clickHandler} />)
              })
            }
          </Stack>

        </Stack>

        <Stack flexDirection={"row"} gap={buttonGap}>
          <Xbuttons.SquareButton value={ButtonValues.answer} onClick={clickHandler} />
          {calLastRow.split('').map((lastRowValue, index) => {
            return (<Xbuttons.SquareButton key={index} value={lastRowValue} onClick={clickHandler} />)
          })}
        </Stack>

      </Stack>

    </div>
  )
}

export default App
