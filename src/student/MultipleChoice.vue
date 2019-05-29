<template>
  <div class="answer">
    Hello Worldd
    <ul id="choices">
      <li v-for="choice in choices" :key="choice.id">
        {{ choice }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import * as io from 'socket.io-client'

export default {
  name: 'MultipleChoice',
  data () {
    return {
      choices: [],
      errors: [],
      lesson: {},
      socket: io('http://localhost:4000')
    }
  },
  created () {
    axios.get(`http://localhost:3000/lessons/` + this.$route.params.id)
      .then(response => {
        this.lesson = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    this.socket.on('activity', function (activity) {
      activity.data.answers.forEach((answer, key) =>
        this.choices.push({
          answer: answer,
          key: key
        })
      )
    }).bind(this)
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
