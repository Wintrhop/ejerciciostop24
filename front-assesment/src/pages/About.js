import "../styles/pages/about.scss";
const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutContainer --blue"></div>

      <div className="aboutProfileContainer">
        <div className="aboutProfile">
          <img
            className="aboutProfileImg"
            alt="cargando"
            src="https://scontent-bog1-1.xx.fbcdn.net/v/t1.6435-9/73504733_10218398389924456_2861460792035770368_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FjuHJiZpa78AX-mKn1J&_nc_ht=scontent-bog1-1.xx&oh=00_AT81saJXc48PSAH8DtPLM0ROM5pg1E1OE0RmGqSjjllT1A&oe=6357F80D"
          ></img>
        </div>
        <div className="profileData">
          <div className="profileName">Jhon Vasquez</div>
          <div className="profileDescription">
            Dispuesto a salir de la zona de comfort y con gran curiosidad,
            Abogado y Musico autodidacta.
          </div>
          <div className="profileEmail"> jhonv.v1@gmail.com</div>
          <div className="profileGithub">
            <a href="https://github.com/Wintrhop">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
