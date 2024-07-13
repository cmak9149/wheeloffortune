import React from 'react'

const Rules = () => {
  return (
    <div className='rules'>
      <h1>Rules</h1>
      <p>Each team takes turns to play and each term costs a token</p>
      <p>In a turn, the player can guess the answer, buy a vowel or guess a consonant.</p>
      <p>A vowel cost 2 tokens</p>
      <p>Right answer will score 5 tokens</p>
      <p>If the player guess a consonant, each matching occurance in the answer worth 2 tokens.</p>
      <p>You can guess once, any time during your turn.</p>
      <p>At the end of the game, the team with the most token wins</p>
      <p></p>
    </div>
  )
}

export default Rules