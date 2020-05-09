<template>
    <nav>
        <v-toolbar>
            <v-toolbar-title class="text-uppercase grey--text" router :to="'/'">
                <v-icon left size="26" class="mb-2 mx-1">mdi-chart-bell-curve</v-icon>
                <span class="font-weight-light">esti</span>
                <span class="">rency</span>
            </v-toolbar-title>
            <v-spacer />
                <v-btn flat class="mr-2" color="primary" v-for="link in links"
                 :key="link.text" router :to="link.route">
                    <span>{{ link.text }}</span>
                    <v-icon right class="mr-0">{{ link.icon }}</v-icon>
                </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { icon: 'mdi-home-analytics', text: 'Home', route: '/' },
        { icon: 'mdi-feather', text: 'About', route: '/about' },
      ],
    };
  },
};
</script>
