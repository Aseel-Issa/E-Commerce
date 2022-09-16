import FilterList from './FilterList'
import Button from '@material-ui/core/Button'
import useOnClickOutside from '../customHooks/useOnClickOutside'
import { useState, useEffect, useRef, createRef } from 'react'

export default function FilterButton({ title, options, applyChange }) {
    
    const [isClicked, setIsClicked] = useState(false)
    const [selected, setSelected] = useState(0)

    let node = createRef(null)
    // close menue when clicking outside of it
    useOnClickOutside(node, '.navbar-links.active', ()=>{
        setIsClicked(false)
    }) 

    // determine how many option has been selected
    useEffect(() => {
        // console.log('clearing btns')
        const initialSelectedOptions = options.filter(o => {return o.selected === true}).length
        setSelected(initialSelectedOptions)
    })

    

    // apply filter based on the selected options
    const applyFilters = options => {
        console.log('applying filters')
        // update number of selected options
        setSelected(options.filter(o => {return o.selected === true}).length)
        // apply filter to generated items (from parent class)
        applyChange(title, options)
        // close list
        setIsClicked(!isClicked)
    }

    const btnTitle = title + (selected > 0 ? '('+selected+')': '')

    const highlightColor = 'title' + (isClicked || selected ? ' secondary' : '')
    const expand = isClicked ? '-' : '+'
    return (
        <div className='filter' ref={node}>
        <a className={highlightColor} href="#" onClick={() => { setIsClicked(!isClicked) }}><span>{btnTitle}</span><span>{expand}</span></a>
        {isClicked ? <FilterList options={options} applyFilters={applyFilters}></FilterList> : null}
        </div>
    )
}