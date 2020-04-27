<template>
  <v-layout fill-height>
    <Loading v-if="!existItems" />

    <template v-else>
      <v-navigation-drawer
        v-model="drawerRight"
        fixed
        app
        right
        width="450"
      >
        <Equipamento />
      </v-navigation-drawer>

      <v-toolbar
        id="cabecalho"
        color="deep-orange accent-4"
        dark
        fixed
        dense
        app
        flat
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click.stop="drawer = !drawer"
            >
              <v-icon>filter_list</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('label.filtros') }}</span>
        </v-tooltip>

        <v-flex text-xs-center>
          <v-btn-toggle mandatory>
            <v-btn
              color="red"
              depressed
              block
              value="left"
            >
              {{ $t('label.equipamentos') }}
            </v-btn>
            <v-btn
              color="red"
              depressed
              block
              value="center"
            >
              {{ $t('label.gears') }}
            </v-btn>
          </v-btn-toggle>
        </v-flex>

        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mr-0"
              icon
              v-on="on"
              @click.stop="drawerRight = !drawerRight"
            >
              <v-icon>business_center</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('label.gears') }}</span>
        </v-tooltip>
      </v-toolbar>

      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
      >
        <Filtros />
      </v-navigation-drawer>

      <DataTable />
    </template>

    <ConfirmDialog ref="confirmDialog" />
    <ExternalState ref="linkerState" />
  </v-layout>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Equipamento from '../components/Equipamento'
import DataTable from './DataTable'
import Filtros from '../components/Filtros'
import ConfirmDialog from '../components/ConfirmDialog'
import ExternalState from '../components/ExternalState'
import Loading from '../components/Loading'

export default {
  name: 'WGView',
  components: {
    Loading,
    Filtros,
    DataTable,
    Equipamento,
    ConfirmDialog,
    ExternalState
  },
  data: () => ({
    drawer: false,
    drawerRight: false,
    right: null,
    left: null,
    dados: null
  }),
  computed: {
    ...mapGetters('items', ['existItems', 'versao'])
  },
  watch: {
    async versao (val, oldVal) {
      if (!oldVal) return
      try {
        await this.$ConfirmDialog.abrir({
          titulo: this.$i18n.t('dialog.atualizar.titulo'),
          mensagem: this.$i18n.t('dialog.atualizar.msg')
        })
        this.atualizarItens()
      } catch (e) {}
    }
  },
  created () {
    this.$store.dispatch('items/init', { lang: this.$lang })
    this.$store.dispatch('filtros/init')
    this.$store.dispatch('gears/init')
  },
  mounted () {
    Vue.prototype.$ConfirmDialog = this.$refs.confirmDialog
    Vue.prototype.$LinkerState = this.$refs.linkerState

    if (this.$vuetify.breakpoint.lgAndUp) {
      this.drawer = true
      this.drawerRight = true
    }
  }
}
</script>

<style scoped></style>