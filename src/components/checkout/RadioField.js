const RadioField = ({ mainLabel, radioValues, name, formikValue, className, onChange, onBlur, error }) => {
  return (
    <>
      <div className="field radio">
          <label>{ mainLabel }:</label>
          <div className={ className? `radio-options ${className}`: "radio-options" }>
          {
            radioValues.map((radioValue, index) => {
              return (
                <div key={index}>
                  <label>{ radioValue }</label>
                  <input type="radio" name={ name } value={ radioValue } checked={ formikValue === radioValue } onChange={ onChange } onBlur={ onBlur } />
                </div>
                )
            })
          }
          </div>
        </div>  
        { error && <p className="error-message">{error}</p> }
    </>
  );
}
 
export default RadioField;