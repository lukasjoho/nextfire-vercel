import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
export default function EnterPage(props) {
	const { user, username } = useContext(UserContext);
	return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>;
}

function SignInButton() {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider);
	};

	return (
		<button className='btn-google' onClick={signInWithGoogle}>
			<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/600px-Google_%22G%22_Logo.svg.png' alt='' />
			Sign in with Google
		</button>
	);
}
function SignOutButton() {
	return <button onClick={auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
	const [formValue, setFormValue] = useState('');
	const { isValid, setIsValid } = useState(false);
	const [loading, setLoading] = useState(false);

	const [user, username] = useContext(UserContext);

	const onChange = (e) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		// Only set form value if length is < 3 OR it passes regex
		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue]);

	const checkUsername = useCallback(
		debounce(async (username) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log('Firestore read executed!');
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	const onSubmit = async (e) => {
		e.preventDefault();

		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
		batch.set(usernameDoc, { uid: user.uid });

		await batch.commit();
	};
	return (
		!username && (
			<section>
				<form onSubmit={onSubmit}>
					<input name='username' placeholder='username' value={formValue} onChange={onChange} />
					<UsernameMessage username={formValue} isValid={isValid} loading={loading} />
					<button type='submit' className='btn-green' disabled={!isValid}>
						Choose
					</button>
					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username valid: {isValid.toString()}
					</div>
				</form>
			</section>
		)
	);
}

function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <p>Checking...</p>;
	} else if (isValid) {
		return <p className='text-success'>{username} is available!</p>;
	} else if (username && !isValid) {
		return <p className='text-danger'>That username is taken!</p>;
	} else {
		return <p></p>;
	}
}
