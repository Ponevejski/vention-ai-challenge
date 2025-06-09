# Bug Description and Fix

## Bug

In the original Enigma implementation, the same machine instance was used for both encryption and decryption, without resetting the rotor positions. As a result, if the message contained non-encrypted characters (such as spaces or punctuation), decryption did not return the original text, because the rotor positions did not match the initial state.

## Fix

For decryption, a new Enigma instance is now created with the same initial settings (rotor positions, ring settings, plugboard). This ensures that the decryption process is identical to the encryption process, and the original text is correctly restored.

Tests have also been added to verify:
- Symmetry of encryption/decryption
- Correct handling of spaces and special characters
- Correct plugboard operation 