<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text slot="activator" class="success" v-on="on">Add new project</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>

                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-text-field slot="activator" v-on="on" label="Due date" prepend-icon="date_range" :value="formattedDate" :rules="inputRules"></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import format from 'date-fns/format'
    import parseISO from 'date-fns/parseISO'
    import db from '@/firebase'

    export default {
        data(){
            return {
                title: '',
                content: '',
                due: null,
                inputRules:[
                    v => v.length >= 3 || 'number characters must be greater than 3'
                ],
                loading: false,
                dialog: false
            }
        },
        computed:{
            formattedDate(){
                return this.due ? format(parseISO(this.due), 'do MMM yyyy') : ''
            }
        },
        methods:{
            submit(){
                if(this.$refs.form.validate()){
                    this.loading = true
                    const project = {
                        title: this.title,
                        content: this.content,
                        due: format(parseISO(this.due), 'do MMM yyyy'),
                        person: 'Ryu',
                        status: 'ongoing'
                    }
                    db.collection('projects').add(project).then(() => {
                        this.loading = false
                        this.dialog = false
                        this.resetFields()
                        this.$emit('projectAdded')
                    })
                }
            },
            resetFields(){
                this.title = ''
                this.content = ''
                this.due = null
            }
        }
    }
</script>

