import "../../styles/general/links.css";

const Links = ({ title, links }) => {
  return (
    <div className="links">
      <p className="title">{ title }</p>
      {
        links.map((link, index) => {
          return <p key={index}>{ link }</p>
        })
      }
    </div>
  );
}
 
export default Links;