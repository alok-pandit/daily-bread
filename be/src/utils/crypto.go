package utils

import "github.com/alexedwards/argon2id"

func ArgonHash(plainText string) (string, error) {
	hash, err := argon2id.CreateHash(plainText, argon2id.DefaultParams)
	if err != nil {
		return "", err
	}
	return hash, nil
}

func ArgonMatch(plainText, hash string) (bool, error) {
	match, err := argon2id.ComparePasswordAndHash(plainText, hash)
	if err != nil {
		return false, err
	}
	return match, nil
}
