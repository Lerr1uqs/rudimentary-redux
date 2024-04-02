import { createStore } from 'redux'
let olderState;
const initState = []

const reducer = function (state = initState, action) {

    olderState = state// 这个state为store保存并每次调用传入的
    
    switch (action.type) {
        case "addBook":
            return [
                ...state,
                {
                    bookId: action.info.bookId,
                    bookName: action.info.bookName,
                }

            ]
        case "delBook":
            // 这里注意 传入的数字可能是字符串形式的 用!=
            return state.filter(item => item.bookId != action.info.bookId)

        default:
            return [
                ...state
            ]
            break
    }
}

const store = createStore(reducer)


// 这几个elements都在index.html中有
const root = document.getElementById('app')
const addBook = document.getElementById('addBook')
const delBook = document.getElementById('delBook')
const bookList = document.getElementById('bookList')

// add book by name
const addBookBtn = document.createElement('button')
const bookNameInput = document.createElement('input')
// remove book by id
const delBookBtn = document.createElement('button')
const bookIdInput = document.createElement('input')

addBookBtn.innerText = 'Add Book'
delBookBtn.innerText = 'Del Book'

const bookIdGenerator = function* () {
    let id = 0
    while (true) {
        yield id++
    }
}()

const genBookId = () => bookIdGenerator.next().value

function handleAddBook() {
    const bookName = bookNameInput.value
    if(bookName) {
        const bookId = genBookId()
        bookNameInput.value = ''
        const action = {
            type: 'addBook',
            info: {
                bookId: bookId,
                bookName: bookName
            }
        }
        // btn事件触发 发送给store的reducer
        store.dispatch(action)
    }
}
function handleDelBook() {
    const bookId = bookIdInput.value
    if (bookId) {
        bookIdInput.value = ''
        const action = {
            type: 'delBook',
            info: {
                bookId: bookId
            }
        }
        store.dispatch(action)
    }
}


addBookBtn.addEventListener('click', handleAddBook)
delBookBtn.addEventListener('click', handleDelBook)

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)


function createBookList(info) {
    const element = document.createElement('li')
    element.innerText = `${info.bookId}: <<${info.bookName}>>`
    return element
}


// show new list 
// 监听store保存的state变化 如果变了 就清空list 并生成新list
store.subscribe(() => {
    // 这里的getState返回的应该就是Reducer的返回值
    const curState = store.getState()
    if(curState.length !== olderState.length) {
        bookList.innerHTML = '' // 清空文本
        curState.forEach(book => {
            bookList.appendChild(createBookList(book))
        })

    }
})

