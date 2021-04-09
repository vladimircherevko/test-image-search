import React, { FC, ChangeEvent } from 'react';

export const SearchForm: FC<{
  value: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
  submit: (e: any) => void;
  lock: boolean;
}> = ({
  value,
  change,
  submit,
  lock
}) => {
  const disabled = lock ? ' disabled' : '';
  const active = value ? 'active' : '';

  return (
    <form onSubmit={ submit }>
      <div className='row valign-wrapper'>
        <div className='col s6 offset-s2'>
          <div className='input-field'>
            <input
              id='keyword'
              name='keyword'
              type='text'
              onChange={ change }
              value={ value }
              maxLength={ 30 } />
            <label
              htmlFor='keyword'
              className={ active }>
              Keyword
            </label>
          </div>
        </div>
        <div className='col s6'>
          <button
            className={ 'btn waves-effect waves-light grey darken-1 white-text' + disabled }
            type='submit'
            disabled={ lock }>Search</button>
        </div>
      </div>
    </form>
  );
};
