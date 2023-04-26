import profilePhoto from '../../images/me.jpg'

export function AboutMe() {
  return (
    <section className="about-me">
      <img src={profilePhoto} alt="Leonid"  className='about-me__profile-photo' />
      <h3 className="about-me__header">About the author</h3>
      <p className="about-me__description">
        This block describes the project author. Here you should indicate your
        name, what you do, and which development technologies you know. You can
        also talk about your experience with Practicum, what you learned there,
        and how you can help potential customers.
      </p>
    </section>
  );
}
