type ComponentProps = {
    name?: string
    isVisible?: boolean
    age?: number 
}

// Tipar onClick = MouseEventHandler;
// Tipar onChange = FormEventHandler;
// Tipar onSubmit = (data: Array<{}>) => void;
// Tipar onFocus: FocusEventHandler;
// Tipar onBlur: 

const Component = ({ name, age, isVisible } : ComponentProps) => {
    return (
        <>
          <h2>COmponent</h2>
          { name }
        </>
    )
}

const Typescript = () => {

  return (
    <>
    <h1>TS</h1>
    <Component />
      
    </>
  )
}

export default Typescript