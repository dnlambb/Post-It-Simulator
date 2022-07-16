import React, { Fragment } from 'react';
import { PostitList } from './components/PostitList';

export function App() {
  return (
    <Fragment>
      <main className='container'>
        <PostitList />
      </main>
    </Fragment>
  )
}