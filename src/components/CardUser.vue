<script lang="ts" setup>
    import { Ilinks } from '../models/Auth/User'
    import CardLink from './CardLink.vue'
    import ProfileAvatar from './ProfileAvatar.vue'

    interface Props{
        principalAccount: Ilinks | null
        nickName: string
        avatar_url?: string
        fullName:string
    }
    const props = defineProps<Props>()
</script>

<template>
    <article class="card-user">
        <header class="card-user__header">
            <div class="card-user__avatar">
                <ProfileAvatar :avatar_url="(props.avatar_url as string)" />
            </div>
            <div class="card-user__names">
                <h2 class="card-user__name">{{props.fullName}}</h2>
                <router-link
                    class="card-user__nickName"
                    :to="{
                        name: 'profile',
                        params: {
                            nickName: props.nickName
                        }
                }">{{props.nickName}}</router-link>
            </div>
        </header>

        <CardLink
            v-if="props.principalAccount"
            :titleLink="props.principalAccount.titleLink"
            :link="props.principalAccount.link"
            :socialIcon="props.principalAccount.socialIcon"
            :id="props.principalAccount.id"
        />
    </article>
</template>
