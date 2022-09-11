import {useState, useEffect, useRef} from 'react'
import Button from '@material-ui/core/Button'

export default function FilterOption({option, selectFilterOption, deSelectFilterOption}){
    const initialRender = useRef(0)
    const [isChosen, setIsChosen] = useState(option.selected)
    const className = 'option'+ (isChosen ? " highlighted": '')

    const switchBtnState = () =>{
        setIsChosen(!isChosen)
    }

    // if the option is selected, then highlight it, otherwise show it in gray
    const handleOption = () => {
        isChosen ? selectFilterOption(option): deSelectFilterOption(option)
    }

    useEffect(() => {
        // check if we are in the first two renders, since react renders components twice in some cases
        if(initialRender.current<2){
            initialRender.current++
        }else{
            handleOption()
        }
    }, [isChosen])

    return(
        isChosen? <Button color="secondary" variant="outlined" className={className} onClick={switchBtnState}>{option.title}</Button>
        :
        <Button variant="outlined" className={className} onClick={switchBtnState}>{option.title}</Button>
    )
}