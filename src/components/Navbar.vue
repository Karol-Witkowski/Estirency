<template>
    <nav>
        <v-toolbar>
         <v-btn text route :to="'/'"
       @click="changeBackgroundColor = !changeBackgroundColor"
       :style="{
           backgroundColor : changeBackgroundColor ? 'white !important' : '',
           color: changeBackgroundColor ? 'white !important' : 'white'
           }">
            <v-toolbar-title class="text-uppercase deep-purple--text">
                <v-icon left size="26" color="deep-purple lighten-2" class="mb-2 mx-1">
                  mdi-chart-bell-curve</v-icon>
                <span class="font-weight-light">esti</span>
                <span class="">rency</span>
            </v-toolbar-title>
          </v-btn>
            <v-spacer />
                <v-btn outlined class="mr-2" width="110" color="deep-purple lighten-1"
                 v-for="link in links"
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
        {
          icon: 'mdi-home-analytics', text: 'Home', route: '/', class: 'width',
        },
        { icon: 'mdi-feather', text: 'About', route: '/about' },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
