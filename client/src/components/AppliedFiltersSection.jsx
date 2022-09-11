
import AppliedFilterButton from './AppliedFilterButton'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'

export default function AppliedFiltersSection({AllFilters, clearFilters, deselectOption}){

    let appliedFilter = []
    // get all selected options regardless their types
        for (let key in AllFilters) {
            AllFilters[key].forEach(o => {
                if(o.selected)
                appliedFilter.push(o)
            })
        }
    
        // show clear all button only if there is at least one filter option
    return (
        <div className='applied-filters'>
        <strong>Applied Filters:</strong>
            {appliedFilter.map((f) => {return <AppliedFilterButton key={f.title+'-'+f.id} option={f} deselectOption={deselectOption}></AppliedFilterButton>})}
            {appliedFilter.length > 0 ? <Button id='clear' variant="contained" color="secondary" onClick={()=>{clearFilters()}}>Clear All</Button> : null}
        </div>
    )
}

