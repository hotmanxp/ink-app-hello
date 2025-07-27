#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

meow(
	`
	Usage
	  $ my-ink-cli-01

	Description
	  Interactive user registration form with validation and selection

	Controls
	  • Enter: Continue/Submit
	  • ←/Backspace: Go back
	  • Esc: Exit

	Examples
	  $ my-ink-cli-01
`,
	{
		importMeta: import.meta,
	}
);

render(<App />);
