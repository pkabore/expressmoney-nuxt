<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-desktop is-8-tablet">
            <h3 class="title has-text-black has-text-centered mb-0">Connection</h3>
            <form autocomplete="off" @submit.prevent="handleLogin">
              <p class="help has-text-centered is-danger">{{ error }}</p>
              <div class="field my-0">
                <label class="label help" for="email">Adresse email, numéro de téléphone</label>
                <b-input
                  icon="envelope"
                  v-model="email"
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div class="field my-0">
                <label class="label help" for="pass">Mot de passe</label>
                <b-input
                  icon="lock"
                  v-model="pwd"
                  id="pass"
                  type="password"
                  placeholder="********"
                  password-reveal
                />
                <button
                  :class="['button mt-2 is-fullwidth is-primary', {'is-loading': isLoading}]"
                  type="submit"
                >Se connecter</button>
              </div>
            </form>
            <p class="has-text-grey help has-text-centered mt-3">
              <NuxtLink to="/register">Créer un compte</NuxtLink>&nbsp;·&nbsp;
              <NuxtLink to="/reset">Mot de passe oublié?</NuxtLink>&nbsp;·&nbsp;
              <NuxtLink to="/contact">Besoin d'aide?</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head: {
    title: "Connection",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Connectez-vous à votre compte pour effectuer votre demande chez Express Money.",
      },
    ],
  },
  data() {
    return {
      email: "",
      pwd: "",
      error: "",
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      if (this.email === "" || this.pwd === "") {
        this.error = "Veuillez entrer vos identifiants.";
        this.isLoading = false;
        return;
      }
      try {
        const csrf = await this.$axios.$get("/api/auth/csrf");
        this.$axios.setHeader("XSRF-TOKEN", csrf.token);
        await this.$auth.loginWith("cookie", {
          data: { email: this.email, pwd: this.pwd },
        });
      } catch (err) {
        this.isLoading = false;
        if (err.response.data) this.error = err.response.data.message;
        else this.error = "Erreur technique survenue! Veuillez reéssayer.";
      }
    },
  },
};
</script>