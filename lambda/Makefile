
NEW_POST=newpost
CONVERT_AUDIO=convertaudio
GET_POSTS=getposts

build: build_newpost build_convertaudio
	@echo "Building binaries..."

## build_newpost: builds the newpost binary as a linux executable
build_newpost:
	@echo "Building newpost binary..."
	cd ./${NEW_POST} && \
	env GOARCH=amd64 GOOS=linux CGO_ENABLED=0 go build -ldflags="-s -w" -o ./bin/bootstrap .
	cd ./${NEW_POST}/bin && zip ${NEW_POST} bootstrap
	@echo "Done!"

## build_convertaudio: builds the convertaudio binary as a linux executable
build_convertaudio:
	@echo "Building convertaudio binary..."
	cd ./${CONVERT_AUDIO} && \
	env GOARCH=amd64 GOOS=linux CGO_ENABLED=0 go build -ldflags="-s -w" -o ./bin/bootstrap .
	cd ./${CONVERT_AUDIO}/bin && zip ${CONVERT_AUDIO} bootstrap
	@echo "Done!"

## go_work_init: initializes and writes a new go.work file in the current directory, 
## creating a new workspace at the current directory.
go_work_init:
	go work init ./util ./newpost ./convertaudio

.PHONY: build build_newpost build_convertaudio go_work
