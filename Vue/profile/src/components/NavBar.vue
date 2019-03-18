<!--
    NavBar:
    构建一个响应式的侧边栏组件
    for mobile: sub item just offer icon and tooltips, full height
    for pc: offer user-avatar, sub item contains icon and title, all component in a      float box container.
-->
<template>
    <nav>
        <div>
            <v-navigation-drawer
                    class="blue lighten-3"
                    dark
                    permanent
            >
                <v-list>
                    <v-list-tile
                            v-for="item in items"
                            :key="item.title"
                            @click=""
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </div>
    </nav>
</template>

<script>

    export default {
        name: "NavBar",
        data () {
            return {
                items: [
                    { title: 'Dashboard', icon: 'dashboard' },
                    { title: 'Account', icon: 'account_box' },
                    { title: 'Admin', icon: 'gavel' }
                ]
            }
        }
    }
</script>

<style scoped>

</style>