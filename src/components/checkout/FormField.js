const FormField = ({ label, type, accept, id, className, value, onChange, onBlur, placeholder, error }) => {
  return (
    <>
      <div className="field">
          <label>{ label }:</label>
          <input type={ type } accept={accept? accept:""} id={ id } name={ id } className={ className } value={ value } onChange={ onChange } onBlur={ onBlur } placeholder={placeholder || `Enter your ${ label }`} />
        </div>  
        { error && <p className="error-message">{error}</p> }
    </>
  );
}
 
export default FormField;