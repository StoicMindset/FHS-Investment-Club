const Resources = () => {
  return (
    <div>
      <section class="hero is-dark-green is-medium is-bold">
        <div class="hero-head">
          <div
            class="navbar"
            id="navbar"
            hx-get="navbar.html"
            hx-trigger="load"
            hx-swap="outerHTML"
          ></div>
        </div>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Resources</h1>
            <p class="subtitle has-text-white">
              The Franklin High School Investment Club
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
