import useModalStore from "../../stores/modals";
import "./Home.css";

export default function Home() {
  const { setLoginVisible } = useModalStore();
  function handleClick() {
    setLoginVisible(true);
  }

  return (
    <>
      <article className="home-container">
        <h2 className="home-title">
          A new , friendly community for developers of all skill levels
        </h2>
        <section className="home-main-text">
          Join our friendly community where developers of all levels connect,
          collaborate, and grow through shared knowledge and support.
        </section>
        <div role="button" className="home-cta-text" onClick={handleClick}>
          Register to begin your journey today!
        </div>
        <img
          src="/images/banner2.jpg"
          className="home-banner-image"
          height={300}
          width={894}
        ></img>
        <div className="home-content-container">
          <section>
            <h3>Network with experienced developers and juniors</h3>
            <p className="home-content-text">
              Our community is a vibrant hub where both seasoned developers and
              enthusiastic juniors come together. Whether you’re looking to
              exchange ideas with industry veterans or connect with peers at
              your own level, you’ll find a welcoming space to expand your
              network. Participate in discussions, collaborate on projects, and
              share insights that can accelerate your learning and career
              growth. Join us to build valuable connections, gain new
              perspectives, and foster relationships that can support your
              professional journey in coding.
            </p>
          </section>

          <section>
            <h3>
              Join a solution-oriented, friendly community, open for developers
              of any skill level
            </h3>
            <p className="home-content-text">
              Step into a welcoming environment where developers of all skill
              levels come together to solve problems and share knowledge. Unlike
              other platforms, our community prioritizes kindness, patience, and
              collaboration, making it the perfect space for beginners and
              experts alike. Whether you’re just starting out or looking to
              deepen your expertise, you’ll find a supportive network ready to
              help you grow. Ask questions without fear, offer insights, and
              become part of a community that values learning and mutual respect
              over competition.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
