import React, {useState} from 'react'

export const Todo: React.FC<{onAdd(title:string):void}> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [count, setCount] = useState(0);

    const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.target.value)

    }
    const keyPressHandler = (event:React.KeyboardEvent) =>{
        if (event.key =='Enter') {
            if (title != '') {
                props.onAdd(title)
                setTitle("")
                setCount(count + 1)
            }
        }
    }

    return (
        <>
            <div className="input-field mt2">
                <input onKeyPress={keyPressHandler} onChange={changeHandler} value={title} type="text" id="title"
                       placeholder="Введите название дела"/>

                <label htmlFor="title" className="active">Введите название дела</label>
                <p>You clicked {count} times</p>
            </div>

        </>
    )
}
