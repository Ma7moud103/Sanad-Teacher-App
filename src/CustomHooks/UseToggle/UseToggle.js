import { useState } from 'react'

export default function UseToggle(defaultValue) {
    const [value, setvalue] = useState(defaultValue)

    function theToggler(value) {


        setvalue(prev => {
            return typeof value === "boolean" ? value : !prev
        })
    }
    return [value, theToggler]
}
