import profilePhoto from "../../images/me.jpg";

export function AboutMe() {
  return (
    <section className="about-me">
      <img
        src={profilePhoto}
        alt="Leonid"
        className="about-me__profile-photo"
      />
      <div className="about-me__wrapper">
        <h3 className="about-me__header">About the author</h3>
        <p className="about-me__description">
        I am a Full Stack Developer and my main qualities are hardworking and a willingness to constantly learn. I find web development fascinating and exciting because it provides endless opportunities for implementing creative ideas.
        <br></br>I am always ready for new challenges and constantly improving my skills to achieve the highest quality in my work.
        </p>
      </div>
    </section>
  );
}
