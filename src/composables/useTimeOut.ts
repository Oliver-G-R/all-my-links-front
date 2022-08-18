import { ref, onMounted } from 'vue'

export const useTimeOut = (localKey: string, defineTime: number) => {
    const stringTime = ref('')
    const isDisableButton = ref(false)

    const intervalTime = () => {
        const getTimeInLocalStorage = localStorage.getItem(localKey)
        const interval = setInterval(() => {
          const currentTime = Date.now() - parseInt(getTimeInLocalStorage as string)
          const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((currentTime % (1000 * 60)) / 1000)
          stringTime.value = `${minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`

          if (currentTime > defineTime) {
            stringTime.value = ''
            isDisableButton.value = false
            localStorage.removeItem(localKey)
            clearInterval(interval)
          }
        }, 1000)
    }

    onMounted(() => {
        const getTimeInLocalStorage = localStorage.getItem(localKey)
        if (getTimeInLocalStorage) {
          intervalTime()
          const currentTime = parseInt(getTimeInLocalStorage)
          const now = Date.now()
          if (now - currentTime > defineTime) {
            localStorage.removeItem(localKey)
          } else {
            isDisableButton.value = true
          }
        }
    })

    const startTime = () => {
        isDisableButton.value = true
        localStorage.setItem(localKey, Date.now().toString())
        setTimeout(() => {
          isDisableButton.value = false
        }, defineTime)
        intervalTime()
    }

    return {
        stringTime,
        isDisableButton,
        startTime
    }
}
