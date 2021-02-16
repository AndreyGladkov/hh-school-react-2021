import React, {useState} from 'react'
import SelectFromGivenReposComponent from './SelectFromGivenReposComponent';
import ManuallySelectRepositoryComponent from './ManuallySelectRepositoryComponent';

import "../../styles/styles.css"

const SelectRepositoryComponent = () => {

    const [selectFromGivenRepos, setSelectFromGivenRepos] = useState(true);

    const switchSelection = (event) => {
        setSelectFromGivenRepos(event.target.value === "given")
    }

    return (
        <div style = {{marginBottom: "20px", height: "70px"}}>
            <div style = {{marginBottom: "20px"}}>
                <h3 style = {{display: "inline", marginRight: "20px", marginBottom: "30px"}} className = "subTitle">Select repository for review</h3>
                <label>Manually</label>
                <input type = "radio" name = "select" value = "manually" 
                        onChange = {switchSelection} 
                        checked = {!selectFromGivenRepos}/>
                <label>From given</label>
                <input type = "radio" name = "select" value = "given" 
                        onChange = {switchSelection}
                        checked = {selectFromGivenRepos}/>
            </div>
            {selectFromGivenRepos ? <SelectFromGivenReposComponent /> : <ManuallySelectRepositoryComponent />}
        </div>
    )
}

export default SelectRepositoryComponent
