
import { useState, useRef, useEffect } from 'react'
import FilterOption from './FilterOption';
import Button from '@material-ui/core/Button'

export default function FilterList({ options, applyFilters }) {

    const [showCancelBtn, setShowCancelBtn] = useState(options.filter(o => { return o.selected }).length !== 0)
    const optionsRef = useRef(options)

    const close = () => {
        optionsRef.current = optionsRef.current.map(o => {
            o.selected = false
            return o
        })
        applyFilters([...optionsRef.current])
    }

    // apply filter based on selected options 
    const apply = () => {
        applyFilters([...optionsRef.current])
    }

    // select one option, and thus show cancel button
    const selectFilterOption = (option) => {
        console.log(option.title + " has been selected")
        let index = optionsRef.current.findIndex(o => { return o.id === option.id })
        optionsRef.current[index].selected = true
        setShowCancelBtn(true)

    }
    // deselect one option, and check if there are no more options, don't show cancel button
    const deSelectFilterOption = (option) => {
        console.log(option.title + " has been deselected")
        let index = optionsRef.current.findIndex(o => { return o.id === option.id })
        optionsRef.current[index].selected = false
        // if there is no selected options, hide cancel button
        if (optionsRef.current.filter(o => { return o.selected }).length === 0)
            setShowCancelBtn(false)
    }
    // console.log(optionsRef.current)
    return (
        <div>
            <div className="arrow-up"></div>
            <div className='filterList'>
                <div className='filter-options'>
                    {optionsRef.current.map(option => {
                        return <FilterOption key={option.id} option={option} selectFilterOption={selectFilterOption} deSelectFilterOption={deSelectFilterOption}></FilterOption>
                    })}
                </div>
                <div className='main-btns'>
                    <div className='cancel'>
                        {showCancelBtn ? <Button variant="contained" color="secondary" onClick={close}>Cancel</Button> : null}
                    </div>
                    <div className='apply'>
                        <Button variant="contained" color="secondary" onClick={apply}>Apply</Button>
                    </div>
                </div>
            </div>
        </div> 
    )


}