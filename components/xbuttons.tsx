// import Button from '@mui/material/Button'
import Button from '@mui/joy/Button'

import React from 'react'


function SquareButton(Props: { value: String, onClick: React.MouseEventHandler<HTMLButtonElement> }) {

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Button onClick={Props.onClick} color={`${Props.value == '='? 'success': 'primary'}`} variant={`${Props.value == '='? 'solid': 'soft'}`} value={Props.value} sx={{ height: "4rem", width: "4rem" }}>
            {Props.value}
        </Button>
    )
}

function RectangularButton(Props: { value: String, onClick: React.MouseEventHandler<HTMLButtonElement>, vertical?}) {

    return (
        <Button onClick={Props.onClick} sx={{ height: `${Props.vertical ? "4rem" : "8rem"}`, width: `${Props.vertical ? "8rem" : "4rem"}` }}>
            {Props.value}
        </Button>
    )
}

// export {SquareButton, }
export default { SquareButton, RectangularButton }