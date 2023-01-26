import { Component } from "react";

class Messages extends Component {

    state = {
        messages: [
            {
                id: 1,
                title: 'Message Title No. 1 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'
            },
            {
                id: 2,
                title: 'Message Title No. 2 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'

            },
            {
                id: 3,
                title: 'Message Title No. 3 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'
            },
        ],
        messagesConst: []
    }

    componentDidMount() {
        const messagesArray = this.state.messages.map(message => <Message key={message.id} title={message.title} date={message.datetime} author={message.author} content={message.content}/>)
        this.setState({
            messagesConst: messagesArray
        })

    }

    render() {

        return (
            <div className='box-border p-10 bg-nav'>
                {this.state.messagesConst}
            </div>
        )
    }
}

const Message = props => {
    return (
        <article>
            <h1 className='text-color font-bold text-[32px]'>{props.title}</h1>
            <p className='text-color/50 '>{props.content}</p>
            <div className='grid grid-cols-[1fr_1fr] text-color'>
                <button className='text-color text-left'>Read more...</button>
                <span className='text-color text-right'>{props.date} by {props.author}</span>
            </div>
        </article>
    )
}
export {  Messages }