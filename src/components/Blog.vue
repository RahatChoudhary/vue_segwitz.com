<template>
	<div>

		<v-row no-gutters class="pa-2">
			<v-col cols="6"><h1>BLOGS</h1></v-col>
			<v-col cols="6">
				<v-btn
					color="primary"
					md
					depressed
					style="float:right"
					@click="dialog = true"
				>
					Create Blog
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-expansion-panels>
					<v-expansion-panel
						v-for="(item,i) in blogs"
						:key="i"
					>
						<v-expansion-panel-header>{{item.heading}}</v-expansion-panel-header>
						<v-expansion-panel-content>
							{{item.content}}
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-col>
		</v-row>
		<v-dialog
			v-model="dialog"
			scrollable
			persistent
			max-width="400px"
		>
			<v-card>
				<v-card-title>Create Blog</v-card-title>
				<v-divider></v-divider>
				<v-card-text style="height: 400px;">
					<v-row class="ma-0">
						<v-col
							cols=12
							md=12
							sm=12
							class="pa-0 pt-2"
						>
							<v-text-field
								v-model="blog.heading"
								dense
								outlined
								label="Heading"
								hide-details
							></v-text-field>
						</v-col>
						<v-col
							cols=12
							md=12
							sm=12
							class="pa-0 pt-2"
						>
							<v-textarea
								v-model="blog.content"
								dense
								outlined
								label="Content"
								rows=10
								hide-details
							></v-textarea>
						</v-col>
					</v-row>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="success"
						small
						depressed
						@click="addBlog"
					>
						Ok
					</v-btn>
					<v-btn
						color="error"
						small
						depressed
						@click="closeBlog"
					>
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialog: false,
				blogs: [
					{
						heading: 'Item',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					},
					{
						heading: 'Heading',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					},
					{
						heading: 'Item',
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					}
				],
				blog: {
					heading: '',
					content: ''
				}
			};
		},
		methods: {
			closeBlog(){
				this.blog.heading = '';
				this.blog.content = '';
				this.dialog = false;
			},
			addBlog(){
				if(!this.blog.heading){
					alert('Blog Heading Must Be Required');
					return;
				}
				if(!this.blog.content){
					alert('Blog Content Must Be Required');
					return;
				}
				this.blogs.push({
					heading: this.blog.heading,
					content: this.blog.content
				});
				this.blog.heading = '';
				this.blog.content = '';
				this.dialog = false;
			}
		},
		mounted() {},
		created: function(){}
	};
</script>